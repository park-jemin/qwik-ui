import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const isOpen = useSignal(false);

  return (
    <>
      <button onClick$={() => (isOpen.value = true)}>Toggle open state</button>
      <Select.Root bind:open={isOpen} class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          <Select.Listbox class="select-listbox">
            {users.map((user) => (
              <Select.Item key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
      </Select.Root>
    </>
  );
});
