```txt
Promt 1: 
Guide to Install Node.js 


Discription:
Prefered Choice:
install with nvm and curl

Excellent choice. `nvm` is one of the most common ways developers manage Node.js versions.

## Step 1: Check if `nvm` is already installed

Run:

```bash
nvm --version
```

If not, then


## Step 2: Install `nvm` (if needed)

The recommended installation method is the one provided by the `nvm` project itself.

Run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Alternatively, if you don't have `curl`:

`curl` is a command-line tool for downloading data over HTTP/HTTPS. It's commonly used to fetch installation scripts, APIs, and other resources.

### Step 1: Check if `curl` is installed

Run:

```bash
curl --version
```

If not, then

---

### Step 2: Install `curl`

Since you're on Ubuntu 20.04:

```bash
sudo apt update
sudo apt install curl
```

[Saftey Tip for curl](./Safety.md) – Saftey Tips for Proffesional practice, Well Students can skip 


Then either restart your terminal or reload your shell configuration:

```bash
source ~/.bashrc
```

Verify the installation:

```bash
nvm --version
```

---

## Step 3: See available Node.js versions

To list versions available for installation:

```bash
nvm ls-remote
```

This shows all released versions.

To see only LTS (Long-Term Support) versions:

```bash
nvm ls-remote --lts
```

---

## Step 4: Install the latest LTS version

The easiest command is:

```bash
nvm install --lts
```

For example, it might install Node.js 22.x if that's the current LTS release.

---

## Step 5: Verify the installation

Check the installed versions:

```bash
node --version
npm --version
npx --version
```

Example output:

```text
v22.18.0
10.9.3
10.9.3
```

---

## Step 6: Set it as the default

To make the installed version the default whenever you open a new terminal:

```bash
nvm alias default lts/*
```

Verify:

```bash
nvm current
```

---

## Useful `nvm` commands

```bash
# Show installed Node.js versions
nvm ls

# Show the current version
nvm current

# Install the latest LTS
nvm install --lts

# Install a specific version
nvm install 22

# Switch to a version
nvm use 22

# Set the default version
nvm alias default 22

# Uninstall a version
nvm uninstall 20
```

Once you've finished installing Node.js with `nvm`, the next step is usually to create your first React project (for example, using **Vite**), which will install React and its project-specific tooling automatically.




[1. Features Updated](./Updates.md) – Installation Guides for git and github 

[2. frontend Setup](./FrontEnd.md) – Start React App

[2. Backend Setup](./backend/README.md) – Creating NODE.js Express server + mongoDB connection 

[3. Git Lab Manual](./ManualGit.md) – Manual for students to write record 

4. **Sample Project for Students to experiment with git/Github**:  
   [Sample Project Link:](https://www.webslesson.info/2026/01/react-pos-system-nodejs-mysql.html)


