import {
  useClaimedNFTSupply,
  useContractMetadata,
  useUnclaimedNFTSupply,
  useActiveClaimCondition,
  Web3Button,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useState} from "react";
import styles from "../styles/Theme.module.css";




const contractID = "1ad1a0cb-dac0-4178-af77-b802c5ff7982";
// Put Your NFT Drop Contract address from the dashboard here
const myNftDropContractAddress = "0xa99479c3BCFaFDcE387C3ABb794e29D1212f556b";
const Home: NextPage = () => {
  const { contract: nftDrop } = useContract(myNftDropContractAddress);

  // The amount the user claims
  const [quantity, setQuantity] = useState(1); // default to 1

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(nftDrop);

  // Load claimed supply and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
  const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);

  // Check if there's NFTs left on the active claim phase
  const isNotReady =
    activeClaimCondition &&
    parseInt(activeClaimCondition?.availableSupply) === 0;

  // Check if there's any NFTs left
  const isSoldOut = unclaimedSupply?.toNumber() === 0;

  // Check price
  const price = parseUnits(
    activeClaimCondition?.currencyMetadata.displayValue || "0",
    activeClaimCondition?.currencyMetadata.decimals
  );

  // Multiply depending on quantity
  const priceToMint = price.mul(quantity);

  // Loading state while we fetch the metadata
  if (!nftDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }
  return (

    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          <h1> 
            {/* {contractMetadata?.name} */}
            Welcome to the Revolution Atheltics Page
            </h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>
            {/* {contractMetadata?.description} */}
            The Revo Club is the ultimate membership program for aspiring professional athletes. Composed of 500 digital tokens and four different tiers at $500 a piece, each one grants lifetime access to annual membership discounts, private sessions, exclusive gear & more.
          </p>
          <p>
          Each purchase will randomly give you a bronze, silver or gold Revo Token. By collecting all three tiers you will unlock the Legendary tier for the ultimate reward package. Rewards for each token are listed below:
          </p>
          <ul> 
          <h2>Bronze</h2>
          <li>15% Membership discount 5 Private Training Sessions Exclusive gear package Bring a guest (1 per month)</li>

          <h2>Silver</h2>
          <li>20% Membership discount 10 private training sessions Upgraded gear package Bring a guest (2 per month)</li>

          <h2>Gold</h2>
          <li>25% Membership discount 15 private training sessions Super upgraded gear package Bring a guest (4 per month)</li>
          </ul>
        </div>

        <div className={styles.imageSide}>
          {/* Image Preview of NFTs */}
          <img
            className={styles.image}
            src="/RevoCardGold.png"
            alt={`${contractMetadata?.name} preview image`}
          />

          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {claimedSupply && unclaimedSupply ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{claimedSupply?.toNumber()}</b>
                  {" / "}
                  {
                    // Add unclaimed and claimed supply to get the total supply
                    claimedSupply?.toNumber() + unclaimedSupply?.toNumber()
                  }
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          {
            // Sold out or show the claim button
            isSoldOut ? (
              <div>
                <h2>Sold Out</h2>
              </div>
            ) : isNotReady ? (
              <div>
                <h2>Not ready to be minted yet</h2>
              </div>
            ) : (
              <>
                <p>Quantity</p>
                <div className={styles.quantityContainer}>
                  <button
                    className={`${styles.quantityControlButton}`}
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  

                  <h4>{quantity}</h4>

                  <button
                    className={`${styles.quantityControlButton}`}
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={
                      quantity >=
                      parseInt(
                        activeClaimCondition?.quantityLimitPerTransaction || "0"
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className={styles.mintContainer}>
                  <Web3Button
                    contractAddress={myNftDropContractAddress}
                    action={async (contract) =>
                      await contract.erc721.claim(quantity)
                    }
                    // If the function is successful, we can do something here.
                    onSuccess={(result) =>
                      alert(
                        `Successfully minted ${result.length} NFT${
                          result.length > 1 ? "s" : ""
                        }!`
                      )
                    }
                    // If the function fails, we can do something here.
                    onError={(error) => alert(error?.message)}
                    accentColor="#0047AB"
                    colorMode="dark"
                  >
                    {`Mint${quantity > 1 ? ` ${quantity}` : ""}${
                      activeClaimCondition?.price.eq(0)
                        ? " (Free)"
                        : activeClaimCondition?.currencyMetadata.displayValue
                        ? ` (${formatUnits(
                            priceToMint,
                            activeClaimCondition.currencyMetadata.decimals
                          )} ${activeClaimCondition?.currencyMetadata.symbol})`
                        : ""
                    }`}
                  </Web3Button>
                </div>
                <div className={styles.mintContainer}>
                  <button className={styles.button4} onClick={() => location.href='https://paper.xyz/checkout/df015785-6d15-4e32-adc3-0dd6438e592f'}  > Click here for more Payment Options!</button>
                </div>

              </>
            )
          }
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      <img
        src="/logo.png"
        alt="thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      />
    </div>
  );
};

export default Home;
