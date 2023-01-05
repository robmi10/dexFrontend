// import { useCall } from "@usedapp/core";

// export function useTotalSupply(tokenAddress) {
//   const daiAddress = DaiTokenAddress;
//   const daiInterface = new ethers.utils.Interface(daiInfo.abi);

//   const { value, error } =
//     useCall(
//       tokenAddress && {
//         contract: new Contract(tokenAddress, ERC20Interface),
//         method: "totalSupply",
//         args: [],
//       }
//     ) ?? {};
//   if (error) {
//     console.error(error.message);
//     return undefined;
//   }
//   return value?.[0];
// }
