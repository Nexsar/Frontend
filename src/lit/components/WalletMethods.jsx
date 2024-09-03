import { Button, ButtonGroup } from "@chakra-ui/react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import {
  get_color_for_wallet,
  get_image_src_for_wallet,
} from "../../lib/utils";

import { SymbolIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";

const WalletMethods = ({ authWithEthWallet, setView }) => {
  const isMounted = useIsMounted();
  const { connectors } = useConnect();

  if (!isMounted) return null;

  return (
    <>
      <div className="h-[12vh] py-3 mt-2">
        <h1 className="text-xl">Connect your web3 wallet</h1>
        <b>
          Connect your wallet then sign a message to verify you&apos;re the
          owner of the address.
        </b>
      </div>
      <Command className="rounded-lg mt-4 border mx-auto shadow-md w-[50vw]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="h-[75vh]">
            {connectors.map((connector) => {
              const appearance = get_color_for_wallet + " text-white";
              const img_src = get_image_src_for_wallet(
                connector.name.toLowerCase(),
              );
              return (
                <CommandItem className="h-[10vh] flex">
                  <SymbolIcon className="mr-2 h-4 w-4" />
                  <Button
                    variant="secondary"
                    disabled={connector.ready}
                    key={connector.id}
                    onClick={() => authWithEthWallet({ connector })}
                  >
                    {connector.name.toLowerCase() === "metamask" && (
                      <div className="btn__icon"></div>
                    )}
                    {connector.name.toLowerCase() === "coinbase wallet" && (
                      <div className="btn__icon"></div>
                    )}
                    <span className="btn__label w-[300px]">
                      Continue with {connector.name}
                    </span>
                  </Button>
                  <img src={img_src} className="w-[40px]" />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};

export default WalletMethods;
