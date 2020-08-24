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

# Edit

I should probably add that there is no queue system involved here. If the request drops or you hit a rate limit, the request will be lost forever. Youre better off using this as a base wrapped around a robust Queue system like Bull. 
