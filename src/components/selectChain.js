import { Select } from 'antd';
import { useContext } from 'react';
import { useConfig } from 'wagmi';
import { AarcSDKContext } from '../AarcSDK';

export default function SelectChain({ config, setConfig }) {

    const { chains } = useConfig()
    const { isLoading } = useContext(AarcSDKContext);

    const handleChangeChain = (chainId) => {
        setConfig({ ...config, destination: { ...config.destination, walletAddress: "", chainId: chainId, chainName: chains.find(chain => chain.id === chainId)?.name } })
    }

    return (
        <div>
            <Select disabled={isLoading} className='w-[200px]' defaultValue={137} value={config?.destination.chainId} onChange={handleChangeChain}>
                {chains.map((chain) => (
                    <Select.Option key={chain.id} value={chain.id}>
                        {chain.name}
                    </Select.Option>
                ))}
            </Select>

        </div>
    );
}