import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/Task";
import { useRouter } from "next/router";

interface Props{
    tasks: Task[]
}

export function TaskList({tasks}: Props) {
    const router = useRouter()
    return (
        <Card.Group itemsPerRow={4}>
            {tasks.map((task) => (
                <Card key={task.id} onClick={() => router.push(`/tasks/edit/${task.id}`)} primary>
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