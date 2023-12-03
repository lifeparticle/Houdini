import { FC, useEffect, useMemo, useState } from "react";
import style from "./ColorPicker.module.scss";
import { Card, Form, Space } from "antd";
import { ColorPicker as Cp } from "@mantine/core";
import {
	INITIAL_COLOR,
	INITIAL_FORMAT,
	FORMAT_LABELS,
} from "./utils/constants";
import ColorFormatTags from "./components/ColorFormatTags";
import { Clipboard } from "components/ComponentInjector";
import DisplayColors from "./components/DisplayColors";
import { calculateColors, determineFormat } from "./utils/helper";
import { CopyInput } from "components/Layouts";
import { ResponsiveInputWithLabel } from "components/General";
import { useDebounce, useParamsValue } from "hooks";
import { PARAMS } from "data/paramsData";
import { ClipboardButton } from "components/InjectedComponent";

type FormatType = Lowercase<(typeof FORMAT_LABELS)[number]>;

const ColorPicker: FC = () => {
	const { searchParams, updateParamsValue } = useParamsValue({
		[PARAMS.color]: INITIAL_COLOR,
		[PARAMS.format]: INITIAL_FORMAT,
	});

	const [colorPickerRan, setColorPickerRan] = useState(false);
	const [formatState, setFormatState] = useState(
		searchParams.get(PARAMS.color) || ""
	);
	const color = String(searchParams.get(PARAMS.color));
	const format = String(searchParams.get(PARAMS.format)) as FormatType;
	const colors = useMemo(() => calculateColors(color), [color]);
	const debouncedSearchTerm = useDebounce(formatState);

	useEffect(() => {
		if (debouncedSearchTerm && !colorPickerRan) {
			updateParamsValue(PARAMS.color, debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, updateParamsValue, colorPickerRan]);

	return (
		<Form layout="vertical">
			<div className={style.cp}>
				<Card bordered={false} className={style.cp__inputs}>
					<Space direction="vertical" wrap>
						<CopyInput>
							<ResponsiveInputWithLabel
								label="Color code"
								value={color}
								onChange={(e) => {
									updateParamsValue(
										PARAMS.color,
										e.target.value
									);
									setColorPickerRan(true);
									updateParamsValue(
										PARAMS.format,
										determineFormat(e.target.value)
									);
								}}
								type="text"
							/>
							<Clipboard
								text={color}
								clipboardComponent={ClipboardButton}
							/>
						</CopyInput>
						<Form.Item label="Color format">
							<ColorFormatTags
								currentFormat={format}
								onSelect={(format) => {
									updateParamsValue(PARAMS.format, format);
								}}
							/>
						</Form.Item>

						<Cp
							format={format}
							value={color}
							onChange={(value) => {
								setFormatState(value);
								setColorPickerRan(false);
							}}
							size="xl"
							aria-label="select a color"
						/>
					</Space>
				</Card>

				<DisplayColors
					colors={colors}
					format={format}
					displayType="colors"
					title="Colors"
				/>
				<DisplayColors
					colors={colors}
					format={format}
					displayType="variables"
					title="CSS variables"
				/>
				<DisplayColors
					colors={colors}
					format={format}
					displayType="use-variables"
					title="Use CSS variables"
				/>
			</div>
		</Form>
	);
};

export default ColorPicker;