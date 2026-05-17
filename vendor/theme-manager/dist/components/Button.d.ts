import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Full-width block button */
    fullWidth?: boolean;
    /** Show a loading spinner and disable interaction */
    loading?: boolean;
    /** Icon placed before the label */
    iconLeft?: React.ReactNode;
    /** Icon placed after the label */
    iconRight?: React.ReactNode;
    /** Additional class names (merged last — override-friendly) */
    className?: string;
    children?: React.ReactNode;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map