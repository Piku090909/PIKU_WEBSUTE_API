import Types "types/site";
import SiteLib "lib/site";
import SiteMixin "mixins/site-api";

actor {
  let state = {
    var owner : ?Principal = null;
    var siteData : Types.SiteData = SiteLib.defaultData();
  };

  include SiteMixin(state);
};

