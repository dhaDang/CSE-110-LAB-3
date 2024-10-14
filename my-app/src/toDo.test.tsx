import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("Required Todo List", () => {
  test("read, all items are displayed on screen", () => {
    render(<ToDoList />);
    dummyGroceryList.forEach((item) => {
      const itemName = screen.getByText(item.name);
      expect(itemName).toBeInTheDocument();
    });
  });

  test("number of checked items are the same as the title", () => {
    render(<ToDoList/>)

    const itemsBought = screen.getByText(/Items bought:/);
    expect(itemsBought).toHaveTextContent("Item bought");
  });
});
