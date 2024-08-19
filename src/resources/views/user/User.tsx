import { Card, Menu, MenuProps } from "antd"

const User = () => {

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'Search'
    },
    {
      key: '3',
      label: 'Explore'
    },
    {
      key: '4',
      label: 'Reels'
    },
    {
      key: '5',
      label: 'Profile'
    }
  ];

  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/5">
        <Menu
          className="min-w-full"
          items={items}
        />
      </div>
      <div className="flex flex-col items-center min-h-screen w-4/5">
        <div className="mt-20">
          <Card className="w-80">
            <div className="max-w-sm rounded overflow-hidden p-4">
              <div className="flex items-center mb-4">
                <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="Avatar" />
                <div className="ml-3">
                  <p className="text-sm font-semibold">party_arty_dk</p>
                </div>
                <div className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <img className="w-full rounded" src="https://via.placeholder.com/300x200" alt="Card image" />

              <div className="py-4">
                <p className="text-gray-700 text-sm">
                  Yesterday I've painted this picture to express my gratitude towards people who always like my posts.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10 5.582 2 10 2s8 3.582 8 8zM8 9v6h4V9H8zm-1 0h2V7H7v2zm6-2v2h-2V7h2zm2 2v6h-2V9h2z" clipRule="evenodd" />
                  </svg>
                  <span>20 comments</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-1">You & 300 others</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3.172 5.172a4 4 0 015.656 0l.172.171.172-.172a4 4 0 115.656 5.656l-5.656 5.657-5.656-5.657a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
            </div>

          </Card>
        </div>

      </div>
    </div>
  )
}

export default User