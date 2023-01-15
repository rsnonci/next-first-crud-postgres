import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import {
    Button,
    Card,
    Form,
    Grid,
    GridColumn,
    Icon,
    Confirm
} from 'semantic-ui-react'
import { Task } from 'src/interfaces/Task'
import Router, { useRouter } from 'next/router'
import { Layout } from "src/components/Layout";

export default function create(){

    const [
        task,
        setTask
    ] = useState({
        title: '',
        description: ''
    })
    const [openConfirm, setOpenConfirm] = useState(false);

    const router = useRouter();

    const createTask = async(task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const updateTask = async (id: string, task: Task) =>
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setTask({...task, [name]: value})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (typeof router.query.id === "string"){
                updateTask(router.query.id, task)
            }else{
                await createTask(task)
            }
            Router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const loadTask = async (id: string) => {
        const res = await fetch("http://localhost:3000/api/tasks/" + id);
        const task = await res.json();
        setTask({ title: task[0].title, description: task[0].description });
    };

    const handleDelete = async (id: string) => {
        try {
          const res = await fetch("http://localhost:3000/api/tasks/" + id, {
            method: "DELETE",
          });
          router.push("/");
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        if (typeof router.query.id === "string") loadTask(router.query.id);
    }, [router.query]);

    return(
        <Layout>
            <Grid centered columns={3} verticalAlign="middle" style={{ height: "70%" }}>
                <GridColumn>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor='title'>Title:</label>
                                    <input type="text" placeholder="Write your title" name="title" onChange={handleChange} value={task.title}></input>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='description'>Description:</label>
                                    <textarea placeholder="Write your description" name="description" rows={2} onChange={handleChange} value={task.description}></textarea>
                                </Form.Field>
                                {router.query.id ? (
                                <Button color="teal">
                                    <Icon name="save" />
                                    Update
                                </Button>
                                ) : (
                                <Button primary>
                                    <Icon name="save" />
                                    Save
                                </Button>
                                )}
                            </Form>
                        </Card.Content>
                    </Card>
                    {router.query.id && (
                        <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                        <Icon name="trash" />
                        Delete
                        </Button>
                    )}
                </GridColumn>
            </Grid>
            <Confirm
                header="Delete a Task"
                content={`Are you sure you want to delete task ${router.query.id}`}
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() =>
                    typeof router.query.id === "string" && handleDelete(router.query.id)
                }
            />
        </Layout>
    )
}