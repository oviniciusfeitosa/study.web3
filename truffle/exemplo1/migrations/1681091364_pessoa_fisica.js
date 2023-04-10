var PessoaFisica = artifacts.require("PessoaFisica");

module.exports = function(deployer) {
  deployer.deploy(PessoaFisica);
};
