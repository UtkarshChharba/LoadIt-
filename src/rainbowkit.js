import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'

import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    linea,
    avalanche,
    bsc,
    zkSync,
    gnosis
} from 'wagmi/chains';


export const wagmiConfig = getDefaultConfig({
    appName: 'RainbowKit demo',
    projectId: '55e9f7ac4cca250593e7ebee9a7925b4',
    chains: [mainnet, polygon, optimism, arbitrum, base, linea, avalanche, bsc, zkSync, gnosis],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [base.id]: http(),
        [linea.id]: http(),
        [avalanche.id]: http(),
        [bsc.id]: http(),
        [zkSync.id]: http(),
        [gnosis.id]: http(),
    },
})

export const availableChains = [mainnet, polygon, optimism, arbitrum, base, linea, avalanche, bsc, zkSync, gnosis]