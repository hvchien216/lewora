import { Textarea } from "@lewora/ui/components/ui/textarea";
import { FormBase, type FormControlFunc } from "./form-base";

export const RHFTextarea: FormControlFunc<{
	horizontal?: boolean;
	controlFirst?: boolean;
}> = ({ horizontal, controlFirst, ...props }) => {
	return (
		<FormBase {...props} horizontal={horizontal} controlFirst={controlFirst}>
			{(field) => <Textarea {...field} />}
		</FormBase>
	);
};
