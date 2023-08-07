import { render, renderHook, waitFor } from "@testing-library/react";
import useFetchList from "lib/utils/hooks/useFetchList";
import { describe, test } from "vitest";
import IconList, { QUERY_KEY, URL } from "./Icon";
import { wrapper } from "test/wrapper";

describe("Icon List component check", () => {
	test("Test async call", async () => {
		const { result } = renderHook(() => useFetchList(QUERY_KEY, URL), {
			wrapper,
		});

		await waitFor(() => expect(result.current.isLoading).toEqual(true));
	});

	test("Render component without creashed", () => {
		render(wrapper({ children: <IconList /> }));
	});
});
