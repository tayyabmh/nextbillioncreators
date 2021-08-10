import Profile from './../pages/profile';

const ProfileFetch = ({
    id, 
    isConnectedToWallet,
    isCompatibleNetwork,
    activeToken,
    amountToSend,
    handleAmountChange,
    handleTokenChange,
    handleSubmit
}) => (
    <div>
        <Profile 
            id={id}
            isConnectedToWallet={isConnectedToWallet}
            isCompatibleNetwork={isCompatibleNetwork}
            activeToken={activeToken}
            amountToSend={amountToSend}
            handleAmountChange={handleAmountChange}
            handleTokenChange={handleTokenChange}
            handleSubmit={handleSubmit}
        />
    </div>
);
export default ProfileFetch;