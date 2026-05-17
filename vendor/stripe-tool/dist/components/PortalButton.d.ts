interface PortalButtonProps {
    customerId: string;
    children: React.ReactNode;
    className?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
export default function PortalButton({ customerId, children, className, onSuccess, onError }: PortalButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PortalButton.d.ts.map