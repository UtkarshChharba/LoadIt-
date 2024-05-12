import { ConnectButton } from "@rainbow-me/rainbowkit";
import Alert from "antd/es/alert/Alert";
import { useAccount, useDisconnect } from "wagmi";
import { Card, Button, Spin, Divider, Radio, Input, Tag } from "antd";
import SelectChain from "./components/selectChain";
import Accounts from "./components/Accounts";

export default function Step2({
    setStep, config, setConfig
}) {
    const { address } = useAccount()

    function shortenWalletAddress(address, prefixLength = 4, suffixLength = 4) {
        if (!address || address.length < prefixLength + suffixLength) {
            return address; // Return the original address if it's too short
        }

        const prefix = address.slice(0, prefixLength);
        const suffix = address.slice(-suffixLength);

        return `${prefix}...${suffix}`;
    }
    const { disconnect } = useDisconnect()

    return (
        <div>
            {address ?
                <div className="w-[50%] mx-auto">
                    {<div className="top-6 fixed z-[100] right-32">
                        <span className="font-semibold z-[100]">Source wallet: </span>{shortenWalletAddress(address)}</div>}
                    <Button className='fixed z-[100] right-2 top-4' onClick={() => {
                        setTimeout(() => {
                            disconnect()
                        }
                            , 1000);
                    }}>Disconnect</Button>
                    <Card
                        className="mt-9"
                        style={{
                            boxShadow: "0 1.125rem 5.5rem -0.25rem #00135b1a, 0 0.5rem 1.75rem -0.375rem #00135b14"
                        }}
                    >
                        <div className="flex gap-2 align-center justify-center">
                            <div className="flex justify-center items-center">Destination Chain</div>
                            <SelectChain config={config} setConfig={setConfig} />
                        </div>
                        <Accounts setStep={setStep} config={config} setConfig={setConfig} />

                    </Card>
                </div> :
                <div>
                    <Alert className='mt-9 mx-auto' style={{ width: "30%" }} message="Please connect your source EOA wallet" type="info" showIcon />
                    <div className="flex justify-center mt-5">
                        <ConnectButton className='mx-auto' />
                    </div>
                </div>
            }
        </div>
    )
}


