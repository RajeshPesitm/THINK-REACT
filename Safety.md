For security, it's a good habit to inspect a script before executing it. Instead of piping it directly to `bash`, you can:

```bash
curl -O https://example.com/install.sh
less install.sh
bash install.sh
```

This lets you review what the script will do before running it. It's a practice many developers follow when using installation scripts from the internet.
