function main()
{
   var s = new XML(config.script),
      defaultUser = s.defaultUser.toString(),
      pageSize = parseInt(s.pageSize.toString(), 10),
      u = args.twitterUser ? args.twitterUser : defaultUser,
      hasConfigPermission = false;
   
   // Work out if the user has permission to configure the dashlet
   
   if (page.url.templateArgs.site != null) // Site or user dashboard?
   {
      // Call the repository to see if the user is a site manager or not
      var obj = context.properties["memberships"];
      if (!obj)
      {
         var json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + stringUtils.urlEncode(user.name));
         if (json.status == 200)
         {
            obj = eval('(' + json + ')');
         }
      }
      if (obj)
      {
         hasConfigPermission = (obj.role == "SiteManager");
      }
   }
   else
   {
      hasConfigPermission = true; // User dashboard
   }

   model.pageSize = pageSize;
   model.twitterUser = u;
   model.hasConfigPermission = hasConfigPermission;
   model.defaultTwitterUser = defaultUser;
}

main();