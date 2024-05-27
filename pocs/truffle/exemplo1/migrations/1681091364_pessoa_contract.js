var PessoaContract = artifacts.require("PessoaContract");

module.exports = function(deployer) {
  deployer.deploy(PessoaContract);
};
