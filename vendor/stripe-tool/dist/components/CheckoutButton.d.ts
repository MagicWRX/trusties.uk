interface CheckoutButtonProps {
    priceId: string;
    children: React.ReactNode;
    className?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
export default function CheckoutButton({ priceId, children, className, onSuccess, onError }: CheckoutButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CheckoutButton.d.ts.map