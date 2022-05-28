// const cds = require("@sap/cds");
const activationService = require("./activationService");
module.exports = function () {
  this.on("activate", async (req) => {
    await activationService.activate(req);
  });

  this.before("NEW", "*", async (req) => {
    // const result = await cds.query("SELECT CURRENT_CONNECTION FROM DUMMY");
    // const result = await cds.update("ConnectionEnvironments",result.CURRENT_CONNECTION).with({environment: '1'});
    if (req.target.elements.environment_ID) req.data.environment_ID = "1";
    if (req.target.elements.function_ID) req.data.function_ID = "4";
    if (req.target.elements.sequence) req.data.sequence = 10;
    // const query = SELECT.one("directory.Session").where({
    //   user: req.user.id,
    // });
    // const session = await cds.tx(req).run(query);
    // if (session === null || !session.directory || !session.version) {
    //   return req.error("mandatory session variable not set");
    // }
    // await cds.run(`SET 'ENVIRONMENT' = '1'`);
  });
};
