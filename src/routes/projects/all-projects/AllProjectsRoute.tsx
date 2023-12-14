import CloudTable from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box"
import SpaceBetween from "@cloudscape-design/components/space-between"
import Button from "@cloudscape-design/components/button"
import { Fragment, useState } from "react"
import AllPetsHeader from "./AllPetsHeader.jsx"
import { TextFilter } from "@cloudscape-design/components"
import CloudLink from "../../../components/CloudLink.tsx"
import { useLoaderData } from "react-router-dom"
import { formatDate } from "../../../common/typedUtils.ts"

interface LoaderData {
  pets: any[];
}

export async function loader(): Promise<LoaderData> {
  return {
    pets: [],
  }
}

export function Component() {
  const { pets } = useLoaderData() as LoaderData
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  return (
    <Fragment>
      <CloudTable
        loading={pets == null}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
        }}
        stickyHeader={true}
        columnDefinitions={[
          {
            id: "name",
            header: "Pet name",
            cell: item => <CloudLink href={`/pets/details/${item.id}`}>{item.name}</CloudLink>,
            sortingField: "name",
            isRowHeader: true,
          },
          {
            id: "animal_type",
            header: "Animal type",
            cell: item => item.animal_type,
            sortingField: "animal_type",
          },
          {
            id: "created_at",
            header: "Created at",
            cell: item => formatDate(item.created_at),
            sortingField: "created_at",
          },
        ]}
        columnDisplay={[
          {
            id: "name",
            visible: true,
          },
          {
            id: "animal_type",
            visible: true,
          },
          {
            id: "created_at",
            visible: true,
          },
        ]}
        items={pets}
        loadingText='Loading resources'
        selectionType='multi'
        trackBy='id'
        variant='full-page'
        empty={
          <Box
            margin={{ vertical: "xs" }}
            textAlign='center'
            color='inherit'
          >
            <SpaceBetween size='m'>
              <b>No resources</b>
              <Button>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
        header={<AllPetsHeader selectedItemsCount={selectedItems.length}/>}
        filter={
          <TextFilter
            filteringPlaceholder='Find pets'
            filteringClearAriaLabel='Clear'
            filteringText=''
          />
        }
      />
    </Fragment>
  )
}
