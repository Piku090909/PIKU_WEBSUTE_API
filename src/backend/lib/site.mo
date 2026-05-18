import Types "../types/site";

module {
  public type SiteData = Types.SiteData;
  public type SocialLink = Types.SocialLink;

  public func defaultData() : SiteData {
    {
      bio = "Connect with me across the digital universe";
      contactEmail = "mralexpiku@gmail.com";
      links = [
        {
          id = "whatsapp";
          title = "WhatsApp";
          href = "https://api.whatsapp.com/send?phone=+918536881026&text=\u{279A}\u{1D407}\u{1D404}\u{1D40B}\u{1D40B}\u{1D40E}_\u{1D6E5}\u{1D40B}\u{1D6EF}\u{1D6F8}_\u{1D6F2}\u{1D6EA}\u{1D6FA}\u{1D448}\u{1F31A}\u{1F497}";
          description = "Chat with me on WhatsApp";
          cta = "Send Message";
        },
        {
          id = "instagram";
          title = "Instagram";
          href = "https://www.instagram.com/alexpiku_badmash?igsh=MXF1ZXIxa283bGI2bg==";
          description = "Follow me on Instagram";
          cta = "Follow";
        },
        {
          id = "facebook";
          title = "Facebook";
          href = "https://www.facebook.com/share/1B2juoWzCE/";
          description = "Connect with me on Facebook";
          cta = "Connect";
        },
        {
          id = "vk";
          title = "VK";
          href = "https://vk.ru/club236355393";
          description = "Join me on VK";
          cta = "Join";
        },
      ];
    };
  };
};
