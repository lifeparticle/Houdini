import { useState, useEffect, useTransition } from "react";
import styles from "./ShadesAndTints.module.scss";
import useCombinedKeyPress from "lib/utils/hooks/useCombinedKeyPress";
import {
	DEFAULT_COLOR,
	DEFAULT_NUM_SHADES,
	OUTPUT_FORMAT,
} from "./utils/constants";
import { generateShadesForColor } from "./utils/helper";
import { SelectOption } from "./utils/types";
import PageGrid from "components/Layouts/PageGrid";
import Colors from "./components/Colors";
import ColorInputs from "./components/ColorInputs";
import useParamsValue from "lib/utils/hooks/useParamsValue";

const ShadesAndTints: React.FC = () => {
	const { searchParams, updateParamsValue } = useParamsValue({
		color: DEFAULT_COLOR,
		percentage: DEFAULT_NUM_SHADES.toString(),
	});

	const color = String(searchParams.get("color"));
	const percentage = String(searchParams.get("percentage"));

	const [shades, setShades] = useState<string[]>([]);
	const [tints, setTints] = useState<string[]>([]);

	const [option, setOption] = useState<SelectOption>(OUTPUT_FORMAT[0]);
	const [isPending, startTransition] = useTransition();

	const resetInputs = () => {
		updateParamsValue("color", DEFAULT_COLOR);
		updateParamsValue("percentage", DEFAULT_NUM_SHADES.toString());
	};

	const clearInputs = () => {
		updateParamsValue("color", "");
		updateParamsValue("percentage", "");
	};

	useCombinedKeyPress(resetInputs, "KeyE");
	useCombinedKeyPress(clearInputs, "KeyR");

	useEffect(() => {
		startTransition(() => {
			const { shades, tints } = generateShadesForColor(
				color,
				Number(percentage)
			);
			setShades(shades);
			setTints(tints);
		});
	}, [color, percentage]);

	return (
		<div className={styles.st}>
			<ColorInputs
				color={color}
				handleColorChange={(e) =>
					updateParamsValue("color", e.target.value)
				}
				handlePercentageChange={(num) =>
					num && updateParamsValue("percentage", num.toString())
				}
				setColor={(value) => updateParamsValue("color", value)}
				percentage={Number(percentage)}
				handleOutputFormatChange={setOption}
				option={option}
				shades={shades}
				tints={tints}
			/>
			<PageGrid>
				<Colors colors={shades} isPending={isPending} type="Shades" />
				<Colors colors={tints} isPending={isPending} type="Tints" />
			</PageGrid>
		</div>
	);
};

export default ShadesAndTints;
