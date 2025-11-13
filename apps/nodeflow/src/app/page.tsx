import { Button, cn, Input } from '@lewora/ui';

export default function Index() {
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome @lewora/nodeflow 👋
            </h1>
            <Input placeholder="Search" />
            <p className="bg-red-400 w-[200px]">
              This is a test tailwind classes
            </p>
            <Button
              className={cn('bg-green-400', 'w-[200px]')}
              variant="destructive"
            >
              Click me asd
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
