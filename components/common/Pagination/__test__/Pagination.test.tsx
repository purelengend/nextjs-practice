import { render, screen } from "@testing-library/react";

// Components
import { Pagination, PaginationProps } from "..";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: () => ({
    get: () => {},
  }),
  usePathname: () => ({
    get: () => {},
  }),
}));

describe("Pagination test cases", () => {
  const setup = (props: PaginationProps) => render(<Pagination {...props} />);

  it("should render correctly", () => {
    const { asFragment } = setup({ total: 10 });

    expect(asFragment()).toMatchSnapshot();
  });
});
