
<p align="center">
<img src="./.assets/SafuuX-Token-White-BG-a5d22aaf.svg" width="256" alt="SafuuX logo" />
</p>

# Hyperverse SafuuX Builderkit

This is an initial scaffold project to assit with building a smart module for the Hyperverse

## How the project is setup

1. `Contracts` - This is the first layer. Think of this as your database model and repository for how to fetch and store data
2. `Source` - Contains your javascript interface to your contracts. 
3. `Stories` - This is your UI inteterface to your smart module that allows for documentating and testing the functionality of your smart module


## Contracts
Modules are primarily written in `solidity`. They utilize the `hardat` framework to assit in the compilation and deploying of your contracts

## Source
The javascript source connects to the smart module using `ethers` by default. The format of a Hyperverse smart module is broken down into further sub sections

1. `Library` - Lib folder contains the detailed functions that read & write to the blockchain. 
2. `useHook` - React hook that exposes your library to the react ecosystem. You'll want to rename this export to better help identify your module
3. `Provider` - Hyperverse modules use the React Context to expose state to child components
4. `Environment` - Simple component that will identify which blockchain and network your module is being used under. This allows EVM modules to easily work with any supported EVM module


# Documentation
For more information and learn about Hyperverse checkout the resources below

- [SafuuX](https://www.safuux.com/)
- [Hyperverse Documentation](https://docs.hyperverse.dev/)
- [Decentology YouTube Channel](https://www.youtube.com/c/Decentology)
