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
    expect("Item bought: 0").toBeInTheDocument;
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect("Item bought: 1").toBeInTheDocument;
    fireEvent.click(checkboxes[0]);
    expect("Item bought: 0").toBeInTheDocument;
  });

  test("initial state of items bought is 0", () => {
    render(<ToDoList />);

    const itemsBought = screen.getByText(/Items bought:/);
    expect(itemsBought).toHaveTextContent("Items bought: 0");
  });

  test("checking multiple items updates count", () => {
    render(<ToDoList />);

    const itemsBought = screen.getByText(/Items bought:/);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect("Item bought: 1").toBeInTheDocument;
    fireEvent.click(checkboxes[1]);
    expect("Item bought: 2").toBeInTheDocument;
  });

  test("unchecking item decreases count", () => {
    render(<ToDoList />);
    const itemsBought = screen.getByText(/Items bought:/);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect("Item bought: 2").toBeInTheDocument;
    fireEvent.click(checkboxes[0]);
    expect("Item bought: 1").toBeInTheDocument;
    fireEvent.click(checkboxes[1]);
    expect("Item bought: 0").toBeInTheDocument;
  });

});

// expect(noteTitle).not.toBeInTheDocument();
