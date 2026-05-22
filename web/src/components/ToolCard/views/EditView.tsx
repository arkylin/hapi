import type { ToolViewProps } from '@/components/ToolCard/views/_all'
import { isObject } from '@hapi/protocol'
import { DiffView } from '@/components/DiffView'

export function EditView(props: ToolViewProps) {
    const input = props.block.tool.input
    if (!isObject(input)) return null

    // Support both HAPI (old_string/new_string) and Kimi (old_str/new_str) field names.
    const oldString = typeof input.old_string === 'string'
        ? input.old_string
        : typeof input.old_str === 'string'
            ? input.old_str
            : null
    const newString = typeof input.new_string === 'string'
        ? input.new_string
        : typeof input.new_str === 'string'
            ? input.new_str
            : null
    if (oldString === null || newString === null) return null

    return (
        <DiffView
            oldString={oldString}
            newString={newString}
            variant="inline"
            size={props.surface === 'dialog' ? 'comfortable' : undefined}
            scrollY={props.surface === 'dialog'}
        />
    )
}
