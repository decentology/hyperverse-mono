// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


interface IDappState {
    function getContractOwner() external view returns (address); // Example READ function

    function incrementCounter(uint256 increment) external; // Example WRITE function

    function getCounter() external view returns (uint256); // Another example READ function
}

//hyperverse deployed library?
//shared library contract

library DappLib {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

/********************************************************************************************/
/* This contract is auto-generated based on your choices in DappStarter. You can make       */
/* changes, but be aware that generating a new DappStarter project will require you to      */
/* merge changes. One approach you can take is to make changes in Dapp.sol and have it      */
/* call into this one. You can maintain all your data in this contract and your app logic   */
/* in Dapp.sol. This lets you update and deploy Dapp.sol with revised code and still        */
/* continue using this one.                                                                 */
/********************************************************************************************/

import "./hyperverse/IHyperverseModule.sol";
///+interfaces
contract Token is IDappState, IHyperverseModule {
    // Allow DappLib(SafeMath) functions to be called for all uint256 types
    // (similar to "prototype" in Javascript)
    using DappLib for uint256;

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


    // Account used to deploy contract
    address private contractOwner;
    address private tenantOwner;
    

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    string public name;
    string public symbol;
    uint256 public decimals;

    // Token balance for each address
    mapping(address => uint256) balances;

    // Approval granted to transfer tokens by one address to another address
    mapping(address => mapping(address => uint256)) internal allowed;

    // Tokens currently in circulation (you'll need to update this if you create more tokens)
    uint256 public total;

    // Tokens created when contract was deployed
    uint256 public initialSupply;

    // Multiplier to convert to smallest unit
    uint256 public UNIT_MULTIPLIER;

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    constructor() {
        metadata = ModuleMetadata(
            "Token",
            Author(msg.sender, "https://externallink.net"),
            "0.0.1",
            3479831479814,
            "https://externalLink.net"
        );
        contractOwner = msg.sender;
    }

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    // Fired when an account authorizes another account to spend tokens on its behalf
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // Fired when tokens are transferred from one account to another
    event Transfer(address indexed from, address indexed to, uint256 value);

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    ///+modifiers

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

     /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TENANT FUNCTIONALITIES  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
     function init(string memory _name, string memory _symbol, uint256 _decimal, address _tenant) external {
          /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
        name = _name;
        symbol = _symbol;
        decimals = _decimal;

        // Multiplier to convert to smallest unit
        UNIT_MULTIPLIER = 10**uint256(decimals);

        uint256 supply = 1000;

        // Convert supply to smallest unit
        total = supply.mul(UNIT_MULTIPLIER);
        initialSupply = total;

        // Assign entire initial supply to contract owner
        tenantOwner = _tenant;
        balances[tenantOwner] = total;
       
     }

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    /**
     * @dev Total supply of tokens
     */
    function totalSupply() external view returns (uint256) {
        return total;
    }

    /**
     * @dev Gets the balance of the calling address.
     *
     * @return An uint256 representing the amount owned by the calling address
     */
    function balance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    /**
     * @dev Gets the balance of the specified address.
     *
     * @param owner The address to query the balance of
     * @return An uint256 representing the amount owned by the passed address
     */
    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    /**
     * @dev Transfers token for a specified address
     *
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     * @return A bool indicating if the transfer was successful.
     */
    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0));
        require(to != msg.sender);
        require(value <= balanceOf(msg.sender), "Not enough balance");

        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[to] = balances[to].add(value);
        emit Transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev Transfers tokens from one address to another
     *
     * @param from address The address which you want to send tokens from
     * @param to address The address which you want to transfer to
     * @param value uint256 the amount of tokens to be transferred
     * @return A bool indicating if the transfer was successful.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(from != address(0), "You can't send from the null address");
        require(value <= allowed[from][msg.sender], "Not enough allowed balance for transfer");
        require(value <= balanceOf(from), "Not enough balance for transfer");
        require(to != address(0), "You can't send to the null address");
        require(from != to, "You can't send to yourself");

        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }

    /**
     * @dev Checks the amount of tokens that an owner allowed to a spender.
     *
     * @param owner address The address which owns the funds.
     * @param spender address The address which will spend the funds.
     * @return A uint256 specifying the amount of tokens still available for the spender.
     */
    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return allowed[owner][spender];
    }

    /**
     * @dev Approves the passed address to spend the specified amount of tokens
     *      on behalf of msg.sender.
     *
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     * @return A bool indicating success (always returns true)
     */
    function approve(address spender, uint256 value) public returns (bool) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    //  Example functions that demonstrate how to call into this contract that holds state from
    //  another contract. Look in ~/interfaces/IDappState.sol for the interface definitions and
    //  in Dapp.sol for the actual calls into this contract.

    /**
     * @dev This is an EXAMPLE function that illustrates how functions in this contract can be
     *      called securely from another contract to READ state data. Using the Contract Access
     *      block will enable you to make your contract more secure by restricting which external
     *      contracts can call functions in this contract.
     */
    function getContractOwner() external view override returns (address) {
        return contractOwner;
    }

    uint256 counter; // This is an example variable used only to demonstrate calling

    // a function that writes state from an external contract. It and
    // "incrementCounter" and "getCounter" functions can (should?) be deleted.
    /**
     * @dev This is an EXAMPLE function that illustrates how functions in this contract can be
     *      called securely from another contract to WRITE state data. Using the Contract Access
     *      block will enable you to make your contract more secure by restricting which external
     *       contracts can call functions in this contract.
     */
    function incrementCounter(uint256 increment)
        external
        override
        /**
        // Enable the modifier below if using the Contract Access feature
        // requireContractAuthorized
         */
    {
        // NOTE: If another contract is calling this function, then msg.sender will be the address
        //       of the calling contract and NOT the address of the user who initiated the
        //       transaction. It is possible to get the address of the user, but this is
        //       spoofable and therefore not recommended.

        require(increment > 0 && increment < 10, "Invalid increment value");
        counter = counter.add(increment); // Demonstration of using SafeMath to add to a number
        // While verbose, using SafeMath everywhere that you
        // add/sub/div/mul will ensure your contract does not
        // have weird overflow bugs.
    }

    /**
     * @dev This is an another EXAMPLE function that illustrates how functions in this contract can be
     *      called securely from another contract to READ state data. Using the Contract Access
     *      block will enable you to make your contract more secure by restricting which external
     *      contracts can call functions in this contract.
     */
    function getCounter() external view override returns (uint256) {
        return counter;
    }
}
