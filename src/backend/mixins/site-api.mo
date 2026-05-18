import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/site";
import SiteLib "../lib/site";

mixin (state : { var owner : ?Principal; var siteData : Types.SiteData }) {

  // --- Ownership ---

  public shared ({ caller }) func claimOwnership() : async Bool {
    switch (state.owner) {
      case (?_) { false };
      case null {
        if (caller.isAnonymous()) {
          Runtime.trap("Anonymous principal cannot claim ownership");
        };
        state.owner := ?caller;
        true;
      };
    };
  };

  public shared query ({ caller }) func isOwner() : async Bool {
    switch (state.owner) {
      case (?owner) { Principal.equal(owner, caller) };
      case null { false };
    };
  };

  // --- Public data access ---

  public query func getSiteData() : async Types.SiteData {
    state.siteData;
  };

  // --- Owner-only update ---

  public shared ({ caller }) func setSiteData(data : Types.SiteData) : async () {
    switch (state.owner) {
      case (?owner) {
        if (not Principal.equal(owner, caller)) {
          Runtime.trap("Unauthorized: caller is not the owner");
        };
      };
      case null {
        Runtime.trap("No owner set — call claimOwnership first");
      };
    };
    state.siteData := data;
  };
};
