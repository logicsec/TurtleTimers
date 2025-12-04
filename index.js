require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getTimeRemaining, ANCHORS } = require('./scraper');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    new SlashCommandBuilder()
        .setName('timers')
        .setDescription('Shows all raid timers'),
    new SlashCommandBuilder()
        .setName('raid')
        .setDescription('Shows timer for a specific raid')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The raid name')
                .setRequired(true)
                .addChoices(
                    ...Object.keys(ANCHORS).map(name => ({ name, value: name }))
                )
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    try {
        console.log('Started refreshing application (/) commands.');
        if (process.env.GUILD_ID) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
        }
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const raidIcons = {
        'MC': '🌋',
        'Molten Core': '🌋',
        'BWL': '🐲',
        'Blackwing Lair': '🐲',
        'AQ40': '🦂',
        'Naxx': '💀',
        'Naxxramas': '💀',
        'ES': '🌿',
        'Emerald Sanctum': '🌿',
        'Onyxia': '🐉',
        'Karazhan': '🏰',
        'Kara': '🏰',
        'Upper Karazhan': '🏰',
        'Lower Karazhan': '🏚️',
        'ZG': '🗿',
        'Zul\'Gurub': '🗿',
        'AQ20': '🏺',
        'Ruins of Ahn\'Qiraj': '🏺',
        'Raid 40': '🔥',
        'Raid 20': '⚔️'
    };

    if (interaction.commandName === 'timers') {
        const embed = new EmbedBuilder()
            .setTitle('⏰ Turtle WoW Raid Timers')
            .setDescription('*All times shown in your local timezone*')
            .setColor(0x00D9FF)
            .setTimestamp();

        // Define raid groups as array for ordering
        const raidGroups = [
            { name: '40-Man Raids', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'ES'] },
            { name: 'Onyxia', raids: ['Onyxia'] },
            { name: 'Karazhan', raids: ['Upper Karazhan', 'Lower Karazhan'] },
            { name: '20-Man Raids', raids: ['ZG', 'AQ20'] }
        ];

        // Add each group as a column
        raidGroups.forEach((group, index) => {
            const raidList = group.raids.map(raid => {
                const time = getTimeRemaining(raid);
                if (time) {
                    const timeStr = time.days > 0
                        ? `${time.days}d ${time.hours}h ${time.minutes}m`
                        : `${time.hours}h ${time.minutes}m`;

                    const resetDate = time.nextReset.toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                    });

                    const icon = raidIcons[raid] || '⏰';
                    // Single newline for tighter spacing
                    return `${icon} ${raid}\n\`${timeStr}\`\n> ${resetDate}`;
                }
                return null;
            }).filter(Boolean).join('\n\n'); // Single newline between raids

            if (raidList) {
                const raidCount = group.raids.length;
                embed.addFields({
                    name: `${group.name.toUpperCase()} (${raidCount})`,
                    value: raidList || '\u200b',
                    inline: true
                });
            }

            // Add blank field after Karazhan to force 20-Man to next row
            if (index === 2) {
                embed.addFields({
                    name: '\u200b',
                    value: '\u200b',
                    inline: false
                });
            }
        });

        await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === 'raid') {
        const raidName = interaction.options.getString('name');
        const time = getTimeRemaining(raidName);

        if (time) {
            const timeStr = time.days > 0
                ? `${time.days}d ${time.hours}h ${time.minutes}m`
                : `${time.hours}h ${time.minutes}m`;

            const resetDate = time.nextReset.toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short'
            });

            await interaction.reply(`**${raidName}** resets in: ${timeStr}\n*Reset date: ${resetDate}*`);
        } else {
            await interaction.reply(`Could not find timer for ${raidName}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
