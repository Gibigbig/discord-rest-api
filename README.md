# Discord-rest-api
Simple functions for interacting with discords rest api. Works great with express apps so can easily manage your users via any custom dashboard.

# How to use.

1) edit config accordingly.
2) install axios

usage:

```
functions = require('./functions');

await functions.removeRole(discord_user_id, site.guildid, site.premiumRole);

```

# Remember

these functions are promised based. please use async/await accordingly
