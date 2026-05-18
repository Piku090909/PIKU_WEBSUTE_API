module {
  public type SocialLink = {
    id : Text;
    title : Text;
    href : Text;
    description : Text;
    cta : Text;
  };

  public type SiteData = {
    bio : Text;
    contactEmail : Text;
    links : [SocialLink];
  };
};
