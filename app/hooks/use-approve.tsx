import { useWeb3 } from "~/contexts/web3-provider";
import { Contract } from "ethers";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

// Compacted ABI for the approve function
const approveAbi = [
  {
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export type ApproveOptions = {
  tokenAddress: string;
  relayerAddress: string;
  amount: number;
};

export function useApprove(
  options?: UseMutationOptions<
    void,
    Error & {
      reason: string;
    },
    ApproveOptions
  >
) {
  const { provider } = useWeb3();
  async function approve({
    tokenAddress,
    relayerAddress,
    amount,
  }: ApproveOptions) {
    const signer = provider.getSigner();
    const wxDai = new Contract(tokenAddress, approveAbi, signer);

    const tx = await wxDai.approve(relayerAddress, amount);
    console.log("tx", tx);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  }
  return useMutation({
    ...options,
    mutationFn: approve,
    mutationKey: ["approve"],
  });
}
