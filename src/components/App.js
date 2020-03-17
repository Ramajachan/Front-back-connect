import React, { PureComponent } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import TasksList from "./tasks-list.component";
import CreateTask from "./create-task.component";
import Navbar from "./navbar.component";

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends PureComponent {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { columns } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>Hello world</h2>
		  <Router>
            <div className="container">
              <Navbar />
              <br/>
              <Route path="/" component={TasksList} />
              <Route path="/create" component={CreateTask} />
            </div>
          </Router>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <ColumnsContainer {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((column, index) => (
                  <Column
                    columnID={column.id}
                    key={column.id}
                    title={column.title}
                    tasks={column.tasks}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <Create addColumn />
              </ColumnsContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(App);
