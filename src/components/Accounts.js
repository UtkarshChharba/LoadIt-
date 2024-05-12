import React, { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { AarcSDKContext } from '../AarcSDK';
import { Button, Spin, Alert, Input, Card, Divider, Tag, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAarc } from '@aarc-dev/deposit-widget';

export default function Accounts({ config, setConfig, setStep }) {
    const deposit = useAarc();
    const { address } = useAccount()
    const [supportedTokens, setSupportedTokens] = useState([]);
    const [filteredSupportedTokens, setFilteredSupportedTokens] = useState([...supportedTokens]);

    const { getSafeAccounts, aarcSDK, accounts, setAccounts, isLoading, setIsLoading } = useContext(AarcSDKContext);


    useEffect(() => {

        Initialize()

    }, [address, config.destination.chainId])


    const Initialize = async () => {
        if (address) {
            setIsLoading(true)
            setAccounts([])
            const result = await Promise.allSettled([
                getSafeAccounts(address, config.destination.chainId),
                getSupportedTokens(config.destination.chainId)
            ]).catch((err) => { console.log(err) });

            const [accountsRes, supportedTokensRes] = result

            if (accountsRes.status == 'fulfilled') {
                setAccounts(accountsRes.value)
            }


            if (supportedTokensRes.status == 'fulfilled') {
                setSupportedTokens(supportedTokensRes.value.result)
                setFilteredSupportedTokens(supportedTokensRes.value.result)
            }

            if (accountsRes.status == 'fulfilled' && accountsRes.value.length > 0 && supportedTokensRes.status == 'fulfilled' && supportedTokensRes.value.result.length > 0) {
                setConfig({
                    ...config, destination: {
                        ...config.destination,
                        walletAddress: accountsRes.value.length > 0 ? accountsRes.value[0].address : "",
                        tokenAddress: config.destination.chainId == 137 ? "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359" : supportedTokensRes.value.result[0].address,
                        tokenSymbol: config.destination.chainId == 137 ? "USDC" : supportedTokensRes.value.result[0].symbol
                    }
                })
            }

            setIsLoading(false)
        }
    }





    const getSupportedTokens = async (chainId) => {
        const endPoint = `${process.env.REACT_APP_BASE_URL}/supported-tokens?chainId=${chainId}&isShortList=${true}`;
        const response = await fetch(endPoint, {
            method: "GET",
            headers: {
                "x-api-key": process.env.REACT_APP_AARC_API_KEY,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return json;
    }

    const handleTokenSearch = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            const filteredTokens = supportedTokens.filter((token) => token.symbol.toLowerCase().includes(value.toLowerCase()))
            setFilteredSupportedTokens(filteredTokens)
        } else if (value.length == 0) {
            setFilteredSupportedTokens(supportedTokens)
        }
    }

    const isDisabled = () => {
        if (config.destination?.walletAddress?.length === 0) {
            return true;
        } else if (isLoading) {
            return true;
        }
        return false;
    }

    return (
        <div className='mt-9 '>
            <Button className='fixed left-9 top-[100px]' onClick={() => setStep(1)}>Back</Button>
            <p className='text-xl font-bold'>Choose destination smart wallet</p>
            {isLoading && <div className='flex flex-col mt-3'><Spin /><p>Fetching Wallets</p></div>}
            {accounts.length === 0 && !isLoading && <Alert className='my-9 mx-auto' style={{ width: "50%" }} message="No deployed wallets found, you can try switching to some other chain" type="info" showIcon />}
            <div className='flex flex-col gap-3 items-center'>
                {accounts.map((acc) => (
                    <Radio key={acc.address}
                        checked={config.destination.walletAddress == acc.address}
                        onClick={() => setConfig({ ...config, destination: { ...config.destination, walletAddress: acc.address } })
                        }
                        className='p-3 flex justify-center items-center m-auto'>
                        <div className="flex items-center">
                            <img className='mr-2 rounded-full' src={acc.logo} height={30} />
                            {acc.address}
                        </div>
                    </Radio>
                ))}
                <div>
                    <p className="font-semibold text-xl m-0">Please provide the destination chain token</p>
                </div>
                <div>
                    <Input addonBefore={<SearchOutlined />} onChange={handleTokenSearch} placeholder="Search token" />
                    <Tag className="mt-3" color="blue">
                        Selected Token: {
                            // config.destination.tokenAddress.length > 0 ? config.destination.tokenSymbol : "None"
                            config.destination.tokenSymbol
                        }
                    </Tag>
                </div>
                <div className="flex h-[300px] overflow-auto flex-wrap gap-3 justify-between items-baseline">
                    {
                        filteredSupportedTokens.map((token) => (
                            <Card key={token.address} style={{ borderColor: config.destination.tokenAddress == token.address ? "red" : "" }} className='p-1 cursor-pointer flex-[15.33%]'
                                onClick={() => setConfig({ ...config, destination: { ...config.destination, tokenAddress: token.address, tokenSymbol: token.symbol } })}
                            >
                                <div className="flex flex-col gap-2" >
                                    <img className="rounded-full self-center" src={token.logoURI} height={40} />
                                    {token.symbol}
                                </div>
                            </Card>
                        ))

                    }
                </div>
            </div>
            <Divider />
            <div className="flex justify-center">
                <Button
                    disabled={isDisabled()}
                    type="primary" onClick={() => deposit()}>
                    Open Widget</Button>
            </div>
        </div>
    )
}