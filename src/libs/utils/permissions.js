const { findOneByPk } = require("../campaigns-api/campaigns-dal");
const { ErrorHandler } = require("../../utils/error");

module.exports = {
    admin_or_campaign_creator: async (user,campaign_id) => {
        if (user.isAdmin) return true;
        let campaign = await findOneByPk(campaign_id);
        if (campaign.UserId === user.id) return true
        throw new ErrorHandler(401, "Unauthorized")
    },
    admin_or_advertiser: async user => user.isAdmin || user.isAdvertiser
}