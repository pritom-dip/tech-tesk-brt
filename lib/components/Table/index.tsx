import { IAbsenceType } from '@/lib/types/types'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import Badge from '@/lib/components/Badge'
import { formattedDate, getEndDate } from '@/lib/utils/dateHelper'
import getStatusType from '@/lib/utils/getStatusType'
import { BiSortAlt2 } from 'react-icons/bi'

interface IProps {
  absences: IAbsenceType[]
}

const Table = ({ absences }: IProps) => {
  const data = useMemo<IAbsenceType[]>(() => absences, [absences])

  const columns = useMemo<ColumnDef<IAbsenceType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: any) => <p>{info.getValue() + 1}</p>
      },
      {
        accessorKey: 'employee',
        header: 'Fullname',
        cell: ({ row }) => (
          <Link href={`/`}>
            {row.original?.employee.firstName +
              ' ' +
              row.original?.employee.lastName}
          </Link>
        )
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: (info: any) => <p>{formattedDate(info.getValue())}</p>
      },
      {
        accessorKey: 'days',
        header: 'Days',
        cell: (info: any) => <p>{info.getValue()}</p>
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: ({ row }) => {
          return (
            <p>
              {formattedDate(
                getEndDate(row.original?.startDate, row.original?.days)
              )}
            </p>
          )
        }
      },
      {
        accessorKey: 'absenceType',
        header: 'Absence Type',
        cell: (info: any) => <p>{getStatusType(info.getValue())}</p>
      },
      {
        accessorKey: 'approved',
        header: 'Approved',
        cell: (info: any) => (
          <p>
            {info.getValue() ? (
              <Badge color="blue" text="Approved" />
            ) : (
              <Badge color="gray" text="Not approved" />
            )}
          </p>
        )
      },
      {
        accessorKey: 'conflicts',
        header: 'Conflict',
        cell: (info: any) => (
          <p>
            {info.getValue() ? (
              <Badge color="green" text="Yes" />
            ) : (
              <Badge color="red" text="No" />
            )}
          </p>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Absences List</h1>

      <div className="container mx-auto">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table
            className="min-w-full divide-y divide-gray-200 table-auto"
            width={table.getTotalSize()}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <thead className="bg-gray-50" key={headerGroup.id}>
                <tr>
                  {headerGroup.headers.map((header: any) => (
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex justify-start align-center gap-2">
                        <div>{header.column.columnDef.header}</div>
                        <div>
                          {header.column.getCanSort() && (
                            <BiSortAlt2
                              className="cursor-pointer"
                              size={16}
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            ))}

            <tbody className="bg-white divide-y divide-gray-200">
              {table?.getRowModel()?.rows?.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      key={cell.id}
                      width={cell.column.getSize()}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
