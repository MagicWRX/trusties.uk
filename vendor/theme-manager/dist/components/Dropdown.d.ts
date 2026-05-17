import React from 'react';
export type SelectSize = 'sm' | 'md' | 'lg';
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /** Label shown above the select */
    label?: string;
    /** Helper text shown below */
    helperText?: string;
    /** Error message (sets error state styling) */
    error?: string;
    size?: SelectSize;
    /** Icon shown on the left side */
    iconLeft?: React.ReactNode;
    /** Full-width */
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export interface DropdownItem {
    label: string;
    value?: string;
    /** Rendered before the label */
    icon?: React.ReactNode;
    /** Dimmed style */
    disabled?: boolean;
    /** Thin separator line before this item */
    separator?: boolean;
    /** Destructive / danger styling */
    destructive?: boolean;
    onClick?: () => void;
}
export interface DropdownProps {
    /** The clickable trigger element */
    trigger: React.ReactNode;
    /** Menu items */
    items: DropdownItem[];
    /** 'left' aligns menu to left edge of trigger; 'right' to right edge */
    align?: 'left' | 'right';
    /** Extra classes on the wrapper div */
    className?: string;
}
/**
 * Select — accessible themed <select> wrapper.
 *
 * @example
 * <Select label="Status" value={val} onChange={e => setVal(e.target.value)}>
 *   <option value="active">Active</option>
 *   <option value="archived">Archived</option>
 * </Select>
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
/**
 * Dropdown — click-trigger floating action menu.
 *
 * @example
 * <Dropdown
 *   trigger={<Button variant="outline">Options ▾</Button>}
 *   items={[
 *     { label: 'Edit', icon: <PencilIcon />, onClick: () => handleEdit() },
 *     { label: 'Delete', destructive: true, onClick: () => handleDelete() },
 *   ]}
 * />
 */
export declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map