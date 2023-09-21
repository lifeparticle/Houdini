import style from "./Sorting.module.scss";
import { useEffect, useState } from "react";
import { detectData, sortData } from "./utils/helper";
import { Input, Form, Card, Badge } from "antd";
import { OUTPUT_FORMAT } from "./utils/constants";
import Clipboard from "components/RenderProps/Clipboard";
import ClipboardButton from "components/General/ClipboardButton";
import PageGrid from "components/Layouts/PageGrid";
import CopyInput from "components/Layouts/CopyInput";
import {
	ResponsiveSegementWithLabel,
	ResponsiveSelectWithLabel,
} from "components/General/FormComponents";
import Warning from "components/General/Warning";

const { TextArea } = Input;

const Sorting: React.FC = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [outputFormat, setOutputFormat] = useState(OUTPUT_FORMAT[0]);
	const [order, setOrder] = useState("Ascending");
	const [dataType, setDataType] = useState("");

	useEffect(() => {
		const sortedData = sortData(input, order);
		setOutput(sortedData.join(outputFormat.value));
		setDataType(detectData(input));
	}, [input, order, outputFormat]);

	return (
		<Form layout="vertical" className={style.sort}>
			<PageGrid>
				<Card className={style.sort__input}>
					<Form.Item
						label={
							<div className={style.sort__input_label}>
								<p>{`Input data`}</p>
								<Badge
									text={`${dataType} detected`}
									color={
										dataType === "No data"
											? "yellow"
											: "green"
									}
								/>
							</div>
						}
					>
						<TextArea
							placeholder="Enter data separated by space or comma or new line"
							value={input}
							style={{
								height: "calc(100dvh - 210px)",
							}}
							onChange={(event) => {
								setInput(event.currentTarget.value);
							}}
							data-gramm={false}
							allowClear
						/>
					</Form.Item>
				</Card>

				<Card className={style.sort__output}>
					{output === "" ? (
						<Warning text="There is no data for sorting, please provide data first." />
					) : (
						<>
							<PageGrid>
								<ResponsiveSegementWithLabel
									label={"Order"}
									value={order}
									onChange={(value: string | number) =>
										setOrder(value as string)
									}
									options={[
										{
											label: "Ascending",
											value: "Ascending",
										},
										{
											label: "Descending",
											value: "Descending",
										},
									]}
								/>
								<CopyInput>
									<ResponsiveSelectWithLabel
										label="Output separator"
										value={outputFormat.value}
										onSelect={(_, option) => {
											setOutputFormat(option);
										}}
										options={OUTPUT_FORMAT}
										defaultActiveFirstOption
									/>

									<Clipboard
										text={output}
										clipboardComponent={ClipboardButton}
									/>
								</CopyInput>
							</PageGrid>
							<Form.Item label="Sorted output">
								<TextArea
									placeholder="output"
									value={output}
									style={{
										height: "calc(100dvh - 300px)",
									}}
									readOnly
									data-gramm={false}
								/>
							</Form.Item>
						</>
					)}
				</Card>
			</PageGrid>
		</Form>
	);
};

export default Sorting;