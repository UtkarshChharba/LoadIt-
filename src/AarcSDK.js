import { ethers } from "ethers";
import { WALLET_TYPE } from "@aarc-xyz/wallets/dist/src/utils/AarcTypes";
import { createContext, useEffect, useState } from "react";
import { useAccount, useConfig, useNetwork } from 'wagmi'
import { notification } from "antd";
import { Wallets } from '@aarc-xyz/wallets'


export const AarcSDKContext = createContext({});


export default function AarcSDKProvider({ children }) {


  const [aarcSDK, setAarcSDK] = useState(null);
  const { address } = useAccount()
  const { chains } = useConfig()

  const [api, contextHolder] = notification.useNotification();
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  async function getSafeAccounts(walletAddress, currentChain) {
    const rpc_url = chains.find((chain) => chain?.id === currentChain).rpcUrls.default.http[0]
    const aarcSDK = new Wallets(
      currentChain,
      rpc_url
    );
    const result = await Promise.allSettled([
      aarcSDK.getSmartWalletAddresses(WALLET_TYPE.SAFE, walletAddress),
      aarcSDK.getSmartWalletAddresses(WALLET_TYPE.BICONOMY, walletAddress),
      aarcSDK.getSmartWalletAddresses(WALLET_TYPE.ETHERSPOT, walletAddress),
      aarcSDK.getSmartWalletAddresses(WALLET_TYPE.ALCHEMY_SIMPLE_ACCOUNT, walletAddress),
      aarcSDK.getSmartWalletAddresses(WALLET_TYPE.ZERODEV_KERNEL, walletAddress)
    ]).catch((err) => { console.log(err) });
    const res = result.filter((r) => r !== undefined)

    const [safe, biconomy, ethers, alchemy, zerodev] = [res[0], res[1], res[2], res[3], res[4]]

    if (safe.status == 'fulfilled') {
      safe?.value.forEach((wallet) => {
        wallet.logo = 'https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg'
      })
    } else if (safe.status == 'rejected') {
      safe.value = []
    }

    if (biconomy.status == 'fulfilled') {
      biconomy?.value.forEach((wallet) => {
        wallet.logo = 'https://canada1.discourse-cdn.com/standard30/uploads/biconomy/original/1X/6d610935c5b528456c9ed44e9b519ee5d4df7c6c.png'
      })
    } else if (biconomy.status == 'rejected') {
      biconomy.value = []
    }

    if (ethers.status == 'fulfilled') {
      ethers?.value?.forEach((wallet) => {
        wallet.logo = 'https://etherspot.io/wp-content/themes/etherspot/assets/images/brand-logo-1-blue.svg'
      })
    } else if (ethers.status == 'rejected') {
      ethers.value = []
    }

    if (alchemy.status == 'fulfilled') {
      alchemy?.value.forEach((wallet) => {
        wallet.logo = 'https://pbs.twimg.com/profile_images/1592585812650008579/8JavCOnE_400x400.png'
      })
    } else if (alchemy.status == 'rejected') {
      alchemy.value = []
    }

    if (zerodev.status == 'fulfilled') {
      zerodev?.value.forEach((wallet) => {
        wallet.logo = 'https://pbs.twimg.com/profile_images/1582474288719880195/DavMgC0t_400x400.jpg'
      })

    } else if (zerodev.status == 'rejected') {
      zerodev.value = []
    }

    const accounts = [...safe.value, ...biconomy.value, ...ethers.value, ...alchemy.value, ...zerodev.value].filter((wallet) => {
      if (wallet.logo !== 'https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg')
        return wallet.isDeployed === true ? wallet : null

      else return wallet
    })
    return accounts
  }

  const value = {
    getSafeAccounts,
    aarcSDK: aarcSDK,
    accounts: accounts,
    setAccounts: setAccounts,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
  }

  return (
    <AarcSDKContext.Provider value={value}>
      {contextHolder}
      {children}
    </AarcSDKContext.Provider>
  );
}