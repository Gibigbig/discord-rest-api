# discord-rest-api
Simple functions for interacting with discords rest api. Works great with express apps so can easily manage your users via any custom dashboard.

# how to use.

1) edit config accordingly.
2) install axios

usage:

```
await functions.removeRole(req.user.id, site.guildid, site.premiumRole);
res.send('done')
```

# Remember

these functions are promised based. please use async/await accordingly
