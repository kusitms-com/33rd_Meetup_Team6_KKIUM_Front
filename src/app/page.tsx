import { PlusIcon } from '@/components/common/icons/PlusIcon';
import { SearchBar } from '@/components/common/SearchBar';
import { TextField } from '@/components/common/TextField';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      Home
      <Button leftIcon={<PlusIcon />}>gdgdgdg</Button>
      <TextField />
      <SearchBar />
    </div>
  );
}
