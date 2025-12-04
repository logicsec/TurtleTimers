# TurtleTimers

A Discord bot that displays raid reset timers for Turtle WoW. The bot scrapes timer data and provides easy-to-read countdowns for all major raids.

## Features

- 🌋 **40-Man Raids**: MC, BWL, AQ40, Naxx, Emerald Sanctum
- 🐉 **Onyxia**: 5-day reset cycle
- 🏰 **Karazhan**: Upper and Lower (5-day reset)
- ⚔️ **20-Man Raids**: Zul'Gurub, AQ20

## Commands

- `/timers` - Display all raid timers in an organized embed
- `/raid [name]` - Show timer for a specific raid

## Setup

### Prerequisites

- Node.js 18 or higher
- Discord Bot Token ([Create one here](https://discord.com/developers/applications))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/logicsec/TurtleTimers.git
   cd TurtleTimers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   DISCORD_TOKEN=your_discord_bot_token
   CLIENT_ID=your_client_id
   GUILD_ID=your_guild_id  # Optional: for guild-specific commands
   ```

4. **Run the bot**
   ```bash
   node index.js
   ```

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/logicsec/TurtleTimers.git
   cd TurtleTimers
   ```

2. **Configure environment variables**
   
   Create a `.env` file with your Discord credentials:
   ```env
   DISCORD_TOKEN=your_discord_bot_token
   CLIENT_ID=your_client_id
   GUILD_ID=your_guild_id
   ```

3. **Build and run**
   ```bash
   docker compose up -d
   ```

### Using Docker

```bash
docker build -t turtletimers .
docker run -d \
  -e DISCORD_TOKEN=your_token \
  -e CLIENT_ID=your_client_id \
  -e GUILD_ID=your_guild_id \
  --name turtletimers \
  --restart unless-stopped \
  turtletimers
```

## Portainer Deployment

### Option 1: Git Repository (Recommended)

1. Log in to your **Portainer** instance
2. Go to **Stacks** → **Add stack**
3. Select **Repository**
4. Enter the repository URL: `https://github.com/logicsec/TurtleTimers.git`
5. Set **Reference**: `refs/heads/main`
6. In **Environment variables**, add:
   - `DISCORD_TOKEN`
   - `CLIENT_ID`
   - `GUILD_ID`
7. Click **Deploy the stack**

### Option 2: Web Editor

1. Log in to **Portainer**
2. Go to **Stacks** → **Add stack**
3. Select **Web editor**
4. Paste the contents of `docker-compose.yml`
5. Add environment variables in the **Environment variables** section
6. Click **Deploy the stack**

> **Note**: For the web editor method, you'll need to either build and push the image to a registry first, or use the Git repository method instead.

## Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the **Bot** section and create a bot
4. Copy the bot token (this is your `DISCORD_TOKEN`)
5. Copy the Application ID from **General Information** (this is your `CLIENT_ID`)
6. Enable the following **Privileged Gateway Intents**:
   - Server Members Intent (if needed)
7. Go to **OAuth2** → **URL Generator**
8. Select scopes: `bot`, `applications.commands`
9. Select bot permissions: `Send Messages`, `Embed Links`
10. Copy the generated URL and invite the bot to your server
11. Copy your server ID (this is your `GUILD_ID` - optional for guild-specific commands)

## Project Structure

```
TurtleTimers/
├── index.js              # Main bot file
├── scraper.js            # Timer calculation logic
├── calculate_resets.js   # Reset calculation utilities
├── debug_reset.js        # Debugging utilities
├── test_scraper.js       # Test script
├── Dockerfile            # Docker image definition
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Node.js dependencies
└── .env.example          # Environment variables template
```

## How It Works

The bot uses hardcoded anchor dates based on known reset times (4:00 AM UTC) and calculates the next reset by adding the appropriate interval:

- **40-Man Raids**: 7-day reset cycle
- **Onyxia**: 5-day reset cycle
- **Karazhan**: 5-day reset cycle
- **20-Man Raids**: 3-day reset cycle

## License

ISC

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
