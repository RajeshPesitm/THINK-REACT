There are two separate things here:

1. **Git** → The version control system.
2. **GitHub** → A hosting service for Git repositories.

You don't install "GitHub" itself on your computer. If you want to interact with GitHub from the terminal, you install the **GitHub CLI (`gh`)**.

Here's the professional setup.

---

# Step 1: Check if Git is already installed

```bash
git --version
```

If you see something like:

```text
git version 2.34.1
```

it's already installed.

If you get:

```text
git: command not found
```

install it.

---

# Step 2: Install Git

Ubuntu's official repositories provide Git, and this is the preferred installation method.

```bash
sudo apt update
sudo apt install git
```

Verify:

```bash
git --version
```

---

# Step 3: Configure Git

Tell Git who you are. This information is used in your commits.

```bash
git config --global user.name "Your Name"
```

```bash
git config --global user.email "your@email.com"
```

Verify:

```bash
git config --list
```

You should see:

```text
user.name=Your Name
user.email=your@email.com
```

---

# Step 4: Check if GitHub CLI is installed

```bash
gh --version
```

If it says `command not found`, install it.

---

# Step 5: Install GitHub CLI (`gh`)

GitHub maintains an official APT repository. This is the recommended way to install it.

1. Install prerequisites:

```bash
sudo apt update
sudo apt install curl gpg
```

2. Add GitHub's signing key:

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
| sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
```

3. Add the repository:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
| sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
```

4. Update package lists:

```bash
sudo apt update
```

5. Install:

```bash
sudo apt install gh
```

Verify:

```bash
gh --version
```

---

# Step 6: Authenticate with GitHub

Run:

```bash
gh auth login
```

It will guide you through signing in, usually by opening a browser or asking you to enter a one-time code.

After logging in, verify:

```bash
gh auth status
```

---

# Recommended setup for a React developer

At this point, a solid development environment includes:

* ✅ VS Code
* ✅ Git
* ✅ GitHub CLI (`gh`)
* ✅ `nvm`
* ✅ Node.js (LTS)
* ✅ npm (installed with Node.js)

You're then ready to create React projects, clone repositories, commit changes with Git, and push them to GitHub.

You're following the same general workflow many professional JavaScript developers use on Ubuntu.
