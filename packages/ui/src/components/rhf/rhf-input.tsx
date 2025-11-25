import { Input } from "@lewora/ui/components/ui/input";
import { FormBase, type FormControlFunc } from "./form-base";

export const RHFInput: FormControlFunc<{
	horizontal?: boolean;
	controlFirst?: boolean;
}> = ({ horizontal, controlFirst, ...props }) => {
	return (
		<FormBase {...props} horizontal={horizontal} controlFirst={controlFirst}>
			{(field) => <Input {...field} />}
		</FormBase>
	);
};
