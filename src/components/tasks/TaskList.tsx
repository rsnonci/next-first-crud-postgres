import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/Task";

interface Props{
    tasks: Task[]
}

export function TaskList({tasks}: Props) {
    return (
        <Card.Group itemsPerRow={4}>
            {tasks.map((task) => (
                <Card key={task.id}>
                    <Card.Content>
                        <Card.Header>{task.title}</Card.Header>
                        {task.created_on && (
                            <Card.Meta>
                                {new Date(task.created_on).toLocaleDateString()}
                            </Card.Meta>
                        )}
                        <Card.Description>{task.description}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}