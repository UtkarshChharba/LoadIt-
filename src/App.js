import './App.css';
import { AarcProvider, useAarc } from "@aarc-dev/deposit-widget"
import { Button, Form, Input, Card, Alert, Spin, ColorPicker, Image, ConfigProvider, Divider, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import '/node_modules/@aarc-dev/deposit-widget/dist/style.css';
import '@aarc-dev/deposit-widget/dist/style.css';
import Navbar from './components/navbar';
import { useAccount } from 'wagmi';
import AarcSDKProvider, { AarcSDKContext } from './AarcSDK';
import Step2 from './Step2';
import logo from './assets/AarcLogo.png'
import pallete from './assets/palette.png'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { availableChains, wagmiConfig } from './rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Coinbase from '@aarc-xyz/deposit-widget-coinbase'
import Transak from '@aarc-dev/deposit-widget-transak'
const { Search } = Input;


function App() {

  const queryClient = new QueryClient()

  const [step, setStep] = useState(1);

  const [config, setConfig] = useState({
    modules: {
      Transak: function (props) {
        return <Transak {...props} />
      },
      Coinbase: function (props) {
        return <Coinbase {...props} />
      },
    },
    destination: {
      chainId: 137,
      tokenAddress: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      walletAddress: "",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainName: "Polygon"
    },
    appearance: {
      logoUrl: logo,
      themeColor: "#1677FF",
    },
    apiKeys: {
      transak: process.env.REACT_APP_TRANSAK_API_KEY,
      aarcSDK: process.env.REACT_APP_PROD_AARC_API_KEY
    },
    onTransactionSuccess: (data) => {
      console.log(data)
      message.success('Transaction successful')
    },
    onTransactionError: (data) => {
      console.log(data)
      message.error('Transaction failed')
    },
    onWidgetClose: () => {
      console.log('Widget closed')
    },
    onWidgetOpen: () => {
      console.log('Widget opened')
    }

  })
  const { Search } = Input;


  return (
    <div className="App">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <AarcSDKProvider>
              <Navbar />
              <div style={{ height: '80vh' }}>
                <AarcProvider config={config}>
                  {step === 1 ? <>
                    <div className='mt-9 mx-6 flex justify-around'>
                      <Card
                        style={{
                          borderRadius: 20,
                          width: 400,
                          boxShadow: "0 1.125rem 5.5rem -0.25rem #00135b1a, 0 0.5rem 1.75rem -0.375rem #00135b14"
                        }}
                      >
                        <div className='flex flex-col gap-5 items-center'>
                          <p className='text-lg font-semibold'>Customize your widget</p>
                          <Image
                            width={"auto"}
                            height={100}
                            src={config.appearance.logoUrl ? config.appearance.logoUrl : "error"}
                            fallback="data:image/png;base64,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"
                          />
                          <div className='flex flex-col gap-1 font-semibold items-center'>
                            <label>Theme Color</label>
                            <ColorPicker value={config.appearance.themeColor} onChange={(color) => {
                              setConfig({
                                ...config,
                                appearance: {
                                  ...config.appearance,
                                  themeColor: color.toHexString()
                                }
                              })

                            }} />
                          </div>
                          <div className='flex gap-1 flex-col'>
                            <label className='font-semibold'>Popular</label>
                            <div className='flex items-center  gap-3 mx-auto'>
                              {['#F45B69', '#1C7C54', '#51BBFE', 'custom'].map((color) => {
                                if (color === 'custom') {
                                  return (
                                    <ColorPicker
                                      key={color}
                                      onChange={(color) => {
                                        setConfig({
                                          ...config,
                                          appearance: {
                                            ...config.appearance,
                                            themeColor: color.toHexString()
                                          }
                                        })

                                      }}
                                    ><div className='w-[25px] h-[25px] flex cursor-pointer rounded-sm'

                                    >
                                        <img src={pallete} />
                                      </div>
                                    </ColorPicker>)
                                }
                                return <div className='w-[25px] h-[25px] flex cursor-pointer rounded-[6px]'
                                  style={{
                                    background: color,
                                  }}
                                  onClick={() => {

                                    setConfig({
                                      ...config,
                                      appearance: {
                                        ...config.appearance,
                                        themeColor: color
                                      }
                                    })

                                  }
                                  }>
                                </div>
                              })}
                            </div>
                          </div>

                          <div className='flex flex-col gap-1 items-center'>
                            <label className='font-semibold'>Logo URL</label>
                            <Search
                              placeholder="https://demo.aarc.xyz/AarcLogo.png"
                              allowClear

                              onSearch={(e) => {

                                setConfig({
                                  ...config,
                                  appearance: {
                                    ...config.appearance,
                                    logoUrl: e
                                  }
                                })

                              }}
                              style={{ width: 304 }}
                            />
                          </div>
                          <Button className='mt-5' onClick={() => {
                            const _config = { ...config }
                            _config.appearance.logoUrl = logo
                            _config.appearance.themeColor = "#1677FF"
                            setConfig(_config)
                          }} >Reset</Button>
                        </div>
                      </Card>

                      <Card
                        style={{
                          borderRadius: 20,
                          boxShadow: "0 1.125rem 5.5rem -0.25rem #00135b1a, 0 0.5rem 1.75rem -0.375rem #00135b14"
                        }}
                      >
                        <div className='text-lg font-semibold'

                        >
                          Widget Preview
                        </div>
                        <div>
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: config.appearance.themeColor,
                                // borderRadius: data.borderRadius,
                              },
                              components: {
                                Button: {
                                  colorPrimary: config.appearance.themeColor,
                                  algorithm: true,
                                },
                              },
                            }}
                          >
                            <Card className='max-w-[350px] mt-4'>
                              <Image
                                width={"auto"}
                                height={100}
                                src={config.appearance.logoUrl ? config.appearance.logoUrl : "error"}
                                fallback="data:image/png;base64,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"
                              />
                              <Alert className='mt-9' message="Requested USDC tokens on Polygon" type="info" showIcon />
                              <div className='flex flex-col gap-3 mt-3'>
                                <Button block color='black' type='primary' size='large'>Deposit via exchange</Button>
                                <Button block type='primary' size='large'>Deposit via card or bank accounts</Button>
                                <Button block type='primary' size='large'>Deposit via any browser wallet</Button>
                              </div>
                              <div className='flex items-center mx-auto self-center flex-1 justify-center gap-2 mt-8'>
                                {/* <div className='font-semibold text-[11px]'> */}
                                  {/* Powered by */}
                                {/* </div> */}
                                {/* <div className='flex items-center'>
                                  <svg width="58" height="15" viewBox="0 0 58 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.7214 6.7047C10.7287 7.4749 8.37236 9.83125 7.60216 12.8239C7.42719 13.5043 7.33398 14.2177 7.33398 14.9532H9.46326C9.46326 14.2067 9.5912 13.4899 9.82675 12.8239C10.4682 11.009 11.9065 9.5707 13.7214 8.92929C14.3874 8.69374 15.1042 8.5658 15.8507 8.5658V6.43652C15.1156 6.4361 14.4022 6.5293 13.7214 6.7047Z" fill="black" />
                                    <path d="M9.82646 2.17713C9.5909 1.51114 9.46296 0.794326 9.46296 0.0478516H7.33369C7.33369 0.794326 7.20575 1.51114 6.97019 2.17713C6.32879 3.99205 4.89049 5.43035 3.07556 6.07176C2.40958 6.30731 1.69276 6.43525 0.946289 6.43525V8.56452C1.69276 8.56452 2.40958 8.69247 3.07556 8.92802C4.76297 9.52452 6.12416 10.8103 6.82276 12.4464C7.0634 11.5775 7.42308 10.7599 7.88571 10.0134C7.14855 8.9797 6.18559 8.11884 5.06969 7.50031C6.46732 6.72545 7.62389 5.56888 8.39875 4.17126C9.0177 5.28715 9.87814 6.25011 10.9119 6.98727C11.6583 6.52464 12.476 6.16496 13.3449 5.92433C11.7087 5.2253 10.423 3.86453 9.82646 2.17713Z" fill="black" />
                                    <path d="M22.7579 1.91992L17.8506 12.9157H19.8197L21.0883 10.06H26.8884L28.1571 12.9157H30.159L25.2518 1.91992H22.7579ZM21.7957 8.4681L23.2827 5.12054L23.9229 3.56152H24.0545L24.6948 5.12054L26.1817 8.4681H21.7957Z" fill="black" />
                                    <path d="M46.0997 4.98966C45.7057 4.72725 45.197 4.5957 44.5736 4.5957C44.0159 4.5957 43.5421 4.69996 43.1538 4.90709C42.7654 5.11491 42.4561 5.39691 42.2266 5.75238C41.9971 6.10784 41.8439 6.5102 41.7669 6.95873H41.6521V4.75944H40.0273V12.9156H41.7998V8.33722C41.7998 7.61509 41.953 7.06299 42.2595 6.67953C42.5653 6.29678 43.0691 6.10505 43.7696 6.10505C44.3818 6.10505 44.8199 6.24219 45.0823 6.51509C45.3447 6.78869 45.4762 7.22043 45.4762 7.81172V8.53385H47.2326V7.46744C47.2326 6.95313 47.1423 6.47731 46.9618 6.03997C46.7813 5.60263 46.4937 5.25206 46.0997 4.98966Z" fill="black" />
                                    <path d="M57.0538 8.17278V8.00904C57.0538 7.3198 56.8704 6.72082 56.5038 6.21211C56.1371 5.70339 55.6368 5.30664 55.0021 5.02254C54.3675 4.73775 53.6397 4.5957 52.8196 4.5957C51.9226 4.5957 51.1402 4.77344 50.4727 5.12891C49.8051 5.48437 49.288 5.97979 48.9214 6.61376C48.5547 7.24842 48.3721 7.99225 48.3721 8.84593C48.3721 9.67723 48.5547 10.4134 48.9214 11.0536C49.288 11.6939 49.8051 12.1914 50.4727 12.5469C51.1395 12.9023 51.9226 13.0801 52.8196 13.0801C53.6404 13.0801 54.3675 12.938 55.0021 12.6532C55.6368 12.3691 56.1371 11.9696 56.5038 11.4553C56.8704 10.941 57.0538 10.3448 57.0538 9.66673V9.4862H55.2974V9.60096C55.2974 10.2356 55.0784 10.7086 54.6411 11.0207C54.203 11.3328 53.5851 11.4882 52.7867 11.4882C51.868 11.4882 51.1948 11.2663 50.768 10.8234C50.3411 10.3805 50.1277 9.72131 50.1277 8.84593C50.1277 7.96006 50.3411 7.29531 50.768 6.85167C51.1948 6.40873 51.8673 6.18691 52.7867 6.18691C53.5851 6.18691 54.2037 6.34296 54.6411 6.65504C55.0784 6.96643 55.2974 7.44015 55.2974 8.07482V8.17348H57.0538V8.17278Z" fill="black" />
                                    <path d="M37.0275 5.03024C36.4747 4.74055 35.7665 4.5957 34.9023 4.5957C34.0382 4.5957 33.2964 4.73775 32.6786 5.02255C32.06 5.30734 31.587 5.6929 31.2588 6.17922C30.9306 6.66624 30.7669 7.22113 30.7669 7.8453V7.91108H32.5232V7.8453C32.5232 7.24353 32.7093 6.81109 33.0809 6.54868C33.4525 6.28628 34.0165 6.15473 34.7715 6.15473C35.5594 6.15473 36.1143 6.28908 36.4376 6.55708C36.7601 6.82508 36.9218 7.29881 36.9218 7.97686V8.45338L33.2132 8.84593C32.6772 8.91171 32.2118 9.02647 31.8179 9.19021C31.4239 9.35465 31.1202 9.58136 30.9068 9.87106C30.7144 10.1328 30.6136 10.4525 30.5947 10.8248L31.3546 12.528C31.8501 12.8953 32.5127 13.0801 33.344 13.0801C34.274 13.0801 35.0479 12.8862 35.6665 12.4979C36.2843 12.1095 36.7028 11.5707 36.9218 10.8815H37.0365V12.9163H38.6614V7.96006C38.6614 7.3037 38.527 6.72362 38.259 6.2205C37.9903 5.71739 37.5802 5.32064 37.0275 5.03024ZM36.5271 10.8157C36.2647 11.1551 35.9037 11.4035 35.4439 11.5623C34.9842 11.7212 34.4426 11.8002 33.8191 11.8002C33.316 11.8002 32.9466 11.7212 32.7114 11.5623C32.4763 11.4042 32.3588 11.16 32.3588 10.8318C32.3588 10.5148 32.4707 10.2881 32.6954 10.151C32.9193 10.0145 33.2614 9.91864 33.7212 9.86336L36.9211 9.50439C36.9204 10.0404 36.7895 10.477 36.5271 10.8157Z" fill="black" />
                                  </svg> */}
                                {/* </div> */}
                              </div>
                            </Card>
                          </ConfigProvider>
                        </div>
                      </Card>
                    </div>
                    <Button className='mt-9' type='primary' onClick={() => { setStep(2) }}>Proceed</Button>
                  </>
                    :

                    <Step2 setStep={setStep} config={config} setConfig={setConfig} />

                  }
                </AarcProvider>
              </div>
            </AarcSDKProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;


